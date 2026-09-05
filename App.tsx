import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LanguageProvider, useLanguage } from './src/localization/LanguageContext';
import { Header } from './src/components/Header';
import { TabBar } from './src/components/TabBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { TestsScreen } from './src/screens/TestsScreen';
import { TestActiveScreen } from './src/screens/TestActiveScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { NotesScreen } from './src/screens/NotesScreen';
import { FlashcardsScreen } from './src/screens/FlashcardsScreen';
import { SyllabusScreen } from './src/screens/SyllabusScreen';
import { BookmarksScreen } from './src/screens/BookmarksScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ActiveTab, ScreenView, MockTest, UserTestAttempt } from './src/types';
import { MOCK_TESTS } from './src/data/mockTests';
import { QUESTIONS } from './src/data/questions';
import { StorageService } from './src/storage/storageService';

const MainAppContent: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [screenView, setScreenView] = useState<ScreenView>('main');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [testAttempt, setTestAttempt] = useState<UserTestAttempt | null>(null);
  const [bookmarksCount, setBookmarksCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [selectedNoteUnitId, setSelectedNoteUnitId] = useState<string | null>(null);

  useEffect(() => {
    loadAppInitialState();

    const backAction = () => {
      if (screenView === 'test_active') {
        // Exit test confirmation
        setScreenView('main');
        setActiveTest(null);
        return true;
      }
      if (screenView === 'test_result') {
        setScreenView('main');
        setActiveTab('tests');
        return true;
      }
      if (activeTab !== 'home') {
        setActiveTab('home');
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [screenView, activeTab]);

  const loadAppInitialState = async () => {
    const userStreak = await StorageService.updateStreak();
    setStreak(userStreak);
    const bookmarks = await StorageService.getBookmarks();
    setBookmarksCount(bookmarks.length);
  };

  const handleStartTest = (testId: string) => {
    const test = MOCK_TESTS.find((item) => item.id === testId) || MOCK_TESTS[0];
    setActiveTest(test);
    setScreenView('test_active');
  };

  const handleFinishTest = (attempt: UserTestAttempt) => {
    setTestAttempt(attempt);
    setScreenView('test_result');
  };

  const handleReattemptTest = () => {
    if (activeTest) {
      setScreenView('test_active');
    } else {
      setScreenView('main');
      setActiveTab('tests');
    }
  };

  const handleBackToTests = () => {
    setActiveTest(null);
    setTestAttempt(null);
    setScreenView('main');
    setActiveTab('tests');
  };

  const handleSelectUnitNote = (unitId: string) => {
    setSelectedNoteUnitId(unitId);
    setActiveTab('notes');
  };

  // Get test specific questions
  const getActiveTestQuestions = () => {
    if (!activeTest) return QUESTIONS;
    return QUESTIONS.filter((q) => activeTest.questionIds.includes(q.id));
  };

  // Render active main tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              loadAppInitialState();
            }}
            onStartMockTest={handleStartTest}
            onSelectUnitNote={handleSelectUnitNote}
          />
        );
      case 'tests':
        return <TestsScreen onStartTest={handleStartTest} />;
      case 'notes':
        return <NotesScreen initialUnitId={selectedNoteUnitId} />;
      case 'flashcards':
        return <FlashcardsScreen />;
      case 'bookmarks':
        return <BookmarksScreen />;
      case 'syllabus':
        return <SyllabusScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return (
          <HomeScreen
            onNavigateTab={(tab) => setActiveTab(tab)}
            onStartMockTest={handleStartTest}
            onSelectUnitNote={handleSelectUnitNote}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* When taking active test */}
      {screenView === 'test_active' && activeTest && (
        <TestActiveScreen
          test={activeTest}
          questions={getActiveTestQuestions()}
          onFinishTest={handleFinishTest}
          onExitTest={() => {
            setActiveTest(null);
            setScreenView('main');
          }}
        />
      )}

      {/* When viewing test scorecard & solutions */}
      {screenView === 'test_result' && testAttempt && (
        <>
          <Header
            title={t.testResultTitle}
            showBack={true}
            onBack={handleBackToTests}
            streak={streak}
          />
          <ResultScreen
            attempt={testAttempt}
            questions={getActiveTestQuestions()}
            onReattempt={handleReattemptTest}
            onBackToTests={handleBackToTests}
          />
        </>
      )}

      {/* Main View with Tab Navigation */}
      {screenView === 'main' && (
        <View style={styles.mainContainer}>
          <Header
            title={
              activeTab === 'home'
                ? t.appName
                : activeTab === 'tests'
                ? t.tabTests
                : activeTab === 'notes'
                ? t.tabNotes
                : activeTab === 'flashcards'
                ? t.tabCards
                : activeTab === 'bookmarks'
                ? t.tabBookmarks
                : activeTab === 'syllabus'
                ? t.tabSyllabus
                : t.tabSettings
            }
            subtitle={t.appSubtitle}
            streak={streak}
            showBack={activeTab !== 'home'}
            onBack={() => setActiveTab('home')}
          />
          <View style={styles.body}>{renderTabContent()}</View>
          <TabBar
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              loadAppInitialState();
            }}
            bookmarksCount={bookmarksCount}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <MainAppContent />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  body: {
    flex: 1,
  },
});
