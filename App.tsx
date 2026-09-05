import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme';
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
import { ActiveTab, ScreenView, MockTest, UserTestAttempt, Question } from './src/types';
import { MOCK_TESTS } from './src/data/mockTests';
import { QUESTIONS } from './src/data/questions';
import { StorageService } from './src/storage/storageService';
import { DataService } from './src/services/dataService';

const MainAppContent: React.FC = () => {
  const { t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [screenView, setScreenView] = useState<ScreenView>('main');
  const [allQuestions, setAllQuestions] = useState<Question[]>(QUESTIONS);
  const [allMockTests, setAllMockTests] = useState<MockTest[]>(MOCK_TESTS);
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [testAttempt, setTestAttempt] = useState<UserTestAttempt | null>(null);
  const [bookmarksCount, setBookmarksCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [selectedNoteUnitId, setSelectedNoteUnitId] = useState<string | null>(null);

  useEffect(() => {
    DataService.getQuestions().then((qs) => {
      if (qs && qs.length > 0) setAllQuestions(qs);
    });
    DataService.getMockTests().then((ts) => {
      if (ts && ts.length > 0) setAllMockTests(ts);
    });
  }, []);

  useEffect(() => {
    loadAppInitialState();

    const backAction = () => {
      if (screenView === 'test_active') {
        setScreenView('main');
        setActiveTest(null);
        return true;
      }
      if (screenView === 'test_result') {
        setScreenView('main');
        setActiveTab('tests');
        return true;
      }
      if (activeTab === 'bookmarks' || activeTab === 'syllabus' || activeTab === 'settings') {
        setActiveTab('more');
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
    const test = allMockTests.find((item) => item.id === testId) || allMockTests[0];
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

  const getActiveTestQuestions = () => {
    if (!activeTest) return allQuestions;
    return allQuestions.filter((q) => activeTest.questionIds.includes(q.id));
  };

  const handleNavigateTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    loadAppInitialState();
  };

  // Render active main content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onNavigateTab={handleNavigateTab}
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
      case 'more':
      case 'settings':
        return (
          <SettingsScreen
            onNavigateTab={handleNavigateTab}
            bookmarksCount={bookmarksCount}
          />
        );
      case 'bookmarks':
        return <BookmarksScreen />;
      case 'syllabus':
        return <SyllabusScreen />;
      default:
        return (
          <HomeScreen
            onNavigateTab={handleNavigateTab}
            onStartMockTest={handleStartTest}
            onSelectUnitNote={handleSelectUnitNote}
          />
        );
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return t.appName;
      case 'tests':
        return t.tabTests;
      case 'notes':
        return t.tabNotes;
      case 'flashcards':
        return t.tabCards;
      case 'more':
        return t.moreMenuTitle;
      case 'bookmarks':
        return t.tabBookmarks;
      case 'syllabus':
        return t.tabSyllabus;
      case 'settings':
        return t.tabSettings;
      default:
        return t.appName;
    }
  };

  const handleHeaderBack = () => {
    if (activeTab === 'bookmarks' || activeTab === 'syllabus' || activeTab === 'settings') {
      setActiveTab('more');
    } else {
      setActiveTab('home');
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.canvasElevated }]}
      edges={['top', 'left', 'right']}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.canvasElevated}
      />

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
        <View style={[styles.mainContainer, { backgroundColor: colors.canvas }]}>
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
        </View>
      )}

      {/* Main View with 5-Tab Navigation */}
      {screenView === 'main' && (
        <View style={[styles.mainContainer, { backgroundColor: colors.canvas }]}>
          <Header
            title={getHeaderTitle()}
            subtitle={activeTab === 'home' ? t.appSubtitle : undefined}
            streak={streak}
            showBack={activeTab !== 'home'}
            onBack={handleHeaderBack}
          />
          <View style={styles.body}>{renderTabContent()}</View>
          <TabBar
            activeTab={activeTab}
            onSelectTab={handleNavigateTab}
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
      <ThemeProvider>
        <LanguageProvider>
          <MainAppContent />
        </LanguageProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});
