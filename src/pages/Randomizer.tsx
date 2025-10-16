import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Randomizer = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [randomString, setRandomString] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateRandomString = useCallback(() => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      toast({
        title: 'Error',
        description: 'Please select at least one character type',
        variant: 'destructive',
      });
      return;
    }

    let result = '';
    const charsetLength = charset.length;
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charsetLength];
    }

    setRandomString(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(randomString);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'String copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-glow">
            <Shuffle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Random String{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Generator</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Generate secure random strings for passwords, API keys, tokens, and unique identifiers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-card space-y-8"
        >
          {/* Generated String Display */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Generated String</label>
            <div className="relative">
              <div className="bg-secondary/50 border border-border rounded-lg p-6 font-mono text-lg break-all min-h-[100px] flex items-center justify-center">
                {randomString || 'Click generate to create a random string'}
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="bg-card"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Length Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Length: {length}</label>
              <span className="text-sm text-muted-foreground">
                {length < 8 ? 'Weak' : length < 16 ? 'Medium' : 'Strong'}
              </span>
            </div>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={4}
              max={64}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Character Type Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Character Types</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                <Label htmlFor="uppercase" className="cursor-pointer">
                  Uppercase (A-Z)
                </Label>
                <Switch
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                <Label htmlFor="lowercase" className="cursor-pointer">
                  Lowercase (a-z)
                </Label>
                <Switch
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                <Label htmlFor="numbers" className="cursor-pointer">
                  Numbers (0-9)
                </Label>
                <Switch
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/30">
                <Label htmlFor="symbols" className="cursor-pointer">
                  Symbols (!@#$...)
                </Label>
                <Switch
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={generateRandomString}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Generate New String
            </Button>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 bg-secondary/50 rounded-lg p-6 border border-border"
        >
          <h3 className="text-lg font-semibold mb-3">💡 Usage Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Use longer strings (16+ characters) for stronger security</li>
            <li>Include symbols for maximum randomness and security</li>
            <li>Perfect for generating passwords, API keys, and tokens</li>
            <li>The generator uses cryptographically secure random values</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Randomizer;
