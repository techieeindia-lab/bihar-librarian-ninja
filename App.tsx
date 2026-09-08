import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/theme';
import { LanguageProvider, useLanguage } from './src/localization/LanguageContext';
import { Header } from './src/components/Header';
import { TabBar } from './src/components/TabBar';
import { HomeScreen } from './src/screens/HomeScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { QuizActiveScreen } from './src/screens/QuizActiveScreen';
import { QuizResultScreen } from './src/screens/QuizResultScreen';
import { OneLinersScreen } from './src/screens/OneLinersScreen';
import { NotesScreen } from './src/screens/NotesScreen';
import { FlashcardsScreen } from './src/screens/FlashcardsScreen';
import { SyllabusScreen } from './src/screens/SyllabusScreen';
import { BookmarksScreen } from './src/screens/BookmarksScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ActiveTab, ScreenView, Quiz, UserQuizAttempt, Question } from './src/types';
import { StorageService } from './src/storage/storageService';
import { DataService } from './src/services/dataService';

const MainAppContent: React.FC = () => {
  const { t } = useLanguage();
  const { colors, isDark } = useTheme();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [screenView, setScreenView] = useState<ScreenView>('main');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizAttempt, setQuizAttempt] = useState<UserQuizAttempt | null>(null);
  const [bookmarksCount, setBookmarksCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [selectedNoteUnitId, setSelectedNoteUnitId] = useState<string | null>(null);

  useEffect(() => {
    DataService.getQuestions().then((qs) => {
      if (qs && qs.length > 0) setAllQuestions(qs);
    });
    DataService.getQuizzes().then((qz) => {
      if (qz && qz.length > 0) setAllQuizzes(qz);
    });
  }, []);

  useEffect(() => {
    loadAppInitialState();

    const backAction = () => {
      if (screenView === 'quiz_active') {
        // Handled inside QuizActiveScreen with exit confirmation modal
        return true;
      }
      if (screenView === 'quiz_result') {
        setScreenView('main');
        setActiveTab('quiz');
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

  const handleStartQuiz = (quizId: string) => {
    const quiz = allQuizzes.find((item) => item.id === quizId) || allQuizzes[0];
    setActiveQuiz(quiz);
    setScreenView('quiz_active');
  };

  const handleFinishQuiz = (attempt: UserQuizAttempt) => {
    setQuizAttempt(attempt);
    setScreenView('quiz_result');
  };

  const handleReattemptQuiz = () => {
    if (activeQuiz) {
      setScreenView('quiz_active');
    } else {
      setScreenView('main');
      setActiveTab('quiz');
    }
  };

  const handleBackToQuizzes = () => {
    setActiveQuiz(null);
    setQuizAttempt(null);
    setScreenView('main');
    setActiveTab('quiz');
  };

  const handleSelectUnitNote = (unitId: string) => {
    setSelectedNoteUnitId(unitId);
    setActiveTab('notes');
  };

  const getActiveQuizQuestions = (): Question[] => {
    if (!activeQuiz) return allQuestions;
    const questions = allQuestions.filter((q) => activeQuiz.questionIds.includes(q.id));
    if (questions.length > 0) return questions;

    // Smart fallback for topic quizzes based on unit ID
    let matchingCat: Question['category'] = 'lis_foundations';
    if (activeQuiz.id.includes('_u2_')) matchingCat = 'classification_cataloguing';
    else if (activeQuiz.id.includes('_u3_')) matchingCat = 'reference_sources';
    else if (activeQuiz.id.includes('_u4_')) matchingCat = 'management';
    else if (activeQuiz.id.includes('_u5_t5')) matchingCat = 'teaching_aptitude';
    else if (activeQuiz.id.includes('_u5_')) matchingCat = 'automation_ict';
    else if (activeQuiz.id.includes('_u1_t5')) matchingCat = 'bihar_gk';

    const catQuestions = allQuestions.filter((q) => q.category === matchingCat);
    return catQuestions.length > 0
      ? catQuestions
      : allQuestions.slice(0, activeQuiz.questionCount || 5);
  };

  const handleNavigateTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  // Render active main content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            onNavigateTab={handleNavigateTab}
            onStartQuiz={handleStartQuiz}
            onSelectUnitNote={handleSelectUnitNote}
          />
        );
      case 'quiz':
      case 'tests': // backward-compatible alias
        return <QuizScreen onStartQuiz={handleStartQuiz} />;
      case 'oneliners':
        return <OneLinersScreen />;
      case 'notes':
        return (
          <NotesScreen
            initialUnitId={selectedNoteUnitId}
            onStartQuiz={handleStartQuiz}
          />
        );
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
            onStartQuiz={handleStartQuiz}
            onSelectUnitNote={handleSelectUnitNote}
          />
        );
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home':
        return t.appName;
      case 'quiz':
      case 'tests':
        return t.tabQuiz;
      case 'oneliners':
        return t.tabOneLiners;
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

      {/* When taking active quiz */}
      {screenView === 'quiz_active' && activeQuiz && (
        <QuizActiveScreen
          quiz={activeQuiz}
          questions={getActiveQuizQuestions()}
          onFinishQuiz={handleFinishQuiz}
          onExitQuiz={() => {
            setActiveQuiz(null);
            setScreenView('main');
          }}
        />
      )}

      {/* When viewing quiz scorecard & solutions */}
      {screenView === 'quiz_result' && quizAttempt && (
        <View style={[styles.mainContainer, { backgroundColor: colors.canvas }]}>
          <Header
            title={t.quizResultTitle}
            showBack={true}
            onBack={handleBackToQuizzes}
            streak={streak}
          />
          <QuizResultScreen
            attempt={quizAttempt}
            questions={getActiveQuizQuestions()}
            onReattempt={handleReattemptQuiz}
            onBackToQuizzes={handleBackToQuizzes}
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
