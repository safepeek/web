'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Link2, ArrowRight, ExternalLink, Shield, Loader2 } from 'lucide-react';
import { analyzeUrl } from './actions';

type AnalysisResult = {
  title: string;
  description: string;
  sourceUrl: string;
  finalUrl: string;
  redirects: string[];
  analyzedAt: string;
};

export default function SearchClient() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeUrl(url.trim());

      if (!response.success) {
        setError(response.error || 'Failed to analyze URL');
        return;
      }

      setResult(response.data);
    } catch (err: any) {
      console.error('Error analyzing URL:', err);
      setError(err.message || 'Failed to analyze URL. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Search className="h-8 w-8 text-primary" aria-hidden="true" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Analyze Any Link</h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Paste any URL below to reveal its true destination, metadata, and redirect chain before you click.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <Card className="shadow-lg border-slate-200">
            <CardContent className="pt-6">
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Link2
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter any URL, e.g., https://tinyurl.com/example"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      aria-label="URL to analyze"
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isLoading} className="bg-primary hover:bg-primary/90 px-8">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Works with all URL shorteners: tinyurl.com, bit.ly, t.co, goo.gl, and more.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Error State */}
          {error && (
            <Card className="mt-6 border-destructive/50 bg-destructive/10">
              <CardContent className="pt-6">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6" role="region" aria-label="Analysis results">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Link Information</h2>
                <Button variant="outline" size="sm" onClick={handleClear}>
                  Clear Results
                </Button>
              </div>

              {/* Main Info Card */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
                    Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Title</dt>
                    <dd className="text-foreground">
                      {result.title || <span className="text-muted-foreground italic">(none)</span>}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Description
                    </dt>
                    <dd className="text-foreground">
                      {result.description || <span className="text-muted-foreground italic">(none)</span>}
                    </dd>
                  </div>
                </CardContent>
              </Card>

              {/* URLs Card */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-primary" aria-hidden="true" />
                    URLs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Source URL
                    </dt>
                    <dd>
                      <a
                        href={result.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1 break-all"
                        aria-label={`Source URL: ${result.sourceUrl} (opens in new tab)`}
                      >
                        {result.sourceUrl}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      Final URL
                    </dt>
                    <dd>
                      <a
                        href={result.finalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1 break-all"
                        aria-label={`Final URL: ${result.finalUrl} (opens in new tab)`}
                      >
                        {result.finalUrl}
                        <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                      </a>
                    </dd>
                  </div>
                </CardContent>
              </Card>

              {/* Redirect Chain Card */}
              <Card className="shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-primary" aria-hidden="true" />
                    Redirect Chain
                  </CardTitle>
                  <CardDescription>
                    {result.redirects.length} redirect{result.redirects.length !== 1 ? 's' : ''} detected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3" aria-label="Redirect chain">
                    {result.redirects.map((redirectUrl, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center"
                          aria-label={`Step ${index + 1}`}
                        >
                          {index + 1}
                        </span>
                        <a
                          href={redirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 break-all pt-0.5"
                          aria-label={`Redirect ${index + 1}: ${redirectUrl} (opens in new tab)`}
                        >
                          {redirectUrl}
                          <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Timestamp */}
              <p className="text-sm text-muted-foreground text-center">
                Analyzed at {new Date(result.analyzedAt).toLocaleString()}
              </p>
            </div>
          )}

          {/* Empty State / Info */}
          {!result && !isLoading && (
            <div className="mt-12 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">What You Can Discover</h3>
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                <Card className="bg-slate-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-foreground mb-2">True Destination</h4>
                    <p className="text-sm text-muted-foreground">
                      See where shortened URLs actually lead before you visit them.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-foreground mb-2">Page Metadata</h4>
                    <p className="text-sm text-muted-foreground">
                      Preview the title and description of any webpage instantly.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-foreground mb-2">Redirect Chain</h4>
                    <p className="text-sm text-muted-foreground">
                      Track every hop a URL takes to reach its final destination.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
