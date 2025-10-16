import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Languages, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// TODO: Replace with your actual RapidAPI key
// Get your key from: https://rapidapi.com/
const RAPIDAPI_KEY = 'YOUR_RAPIDAPI_KEY_HERE';

const Translator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter some text to translate',
        variant: 'destructive',
      });
      return;
    }

    if (RAPIDAPI_KEY === 'YOUR_RAPIDAPI_KEY_HERE') {
      toast({
        title: 'API Key Required',
        description: 'Please add your RapidAPI key in src/pages/Translator.tsx',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Example using Google Translate API via RapidAPI
      // Replace with your actual RapidAPI endpoint
      const response = await axios.post(
        'https://google-translate1.p.rapidapi.com/language/translate/v2',
        {
          q: sourceText,
          source: sourceLang,
          target: targetLang,
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
          },
        }
      );

      setTranslatedText(response.data.data.translations[0].translatedText);
      toast({
        title: 'Success',
        description: 'Text translated successfully!',
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: 'Translation Failed',
        description: 'Failed to translate text. Please check your API key and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-glow">
            <Languages className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI <span className="bg-gradient-primary bg-clip-text text-transparent">Translator</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Translate text between multiple languages with high accuracy using AI-powered translation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Source Text */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Source Language</label>
                <Select value={sourceLang} onValueChange={setSourceLang}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {sourceText.length} characters
              </p>
            </div>

            {/* Translated Text */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Target Language</label>
                <Select value={targetLang} onValueChange={setTargetLang}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="min-h-[300px] p-4 rounded-lg bg-secondary/50 border border-border">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : translatedText ? (
                  <p className="text-foreground whitespace-pre-wrap">{translatedText}</p>
                ) : (
                  <p className="text-muted-foreground italic">
                    Translation will appear here...
                  </p>
                )}
              </div>
              {translatedText && (
                <p className="text-xs text-muted-foreground">
                  {translatedText.length} characters
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleTranslate}
              disabled={isLoading || !sourceText.trim()}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  Translate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* Setup Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 bg-secondary/50 rounded-lg p-6 border border-border"
        >
          <h3 className="text-lg font-semibold mb-3">🔑 Setup Instructions</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Sign up for a free account at <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RapidAPI</a></li>
            <li>Subscribe to the Google Translate API (free tier available)</li>
            <li>Copy your API key from the RapidAPI dashboard</li>
            <li>Open <code className="bg-muted px-2 py-1 rounded">src/pages/Translator.tsx</code></li>
            <li>Replace <code className="bg-muted px-2 py-1 rounded">YOUR_RAPIDAPI_KEY_HERE</code> with your actual API key</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

export default Translator;
