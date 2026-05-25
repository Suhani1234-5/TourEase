import { useState, useEffect } from 'react';
import ThemeContext from './ThemeObject';

const THEME_STORAGE_KEY = 'tourease_theme';

export const ThemeProvider = ({ children }) => {
    // Initialize theme from localStorage or system preference
    const [theme, setTheme] = useState(() => {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved && (saved === 'light' || saved === 'dark')) {
                return saved;
            }
        } catch (error) {
            console.error('Error loading theme from localStorage:', error);
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        try {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            console.error('Error applying theme:', error);
        }
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = (e) => {
            try {
                const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
                if (!savedTheme) {
                    setTheme(e.matches ? 'dark' : 'light');
                }
            } catch (error) {
                console.error('Error handling system preference change:', error);
            }
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener(handleChange);
            return () => mediaQuery.removeListener(handleChange);
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = {
        theme,
        toggleTheme,
        setTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

