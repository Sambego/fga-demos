"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, Loader2, Users, Globe } from "lucide-react";
import { queryDocumentsWithFGA, getRagModel } from "../actions";
import ModelPreview from "../../components/model-preview";

export default function AIPage() {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessLevel, setAccessLevel] = useState<string>("public");
  const [modelContent, setModelContent] = useState<string>("");

  // Load the FGA model content on component mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const model = await getRagModel();
        setModelContent(model);
      } catch (error) {
        console.error("Error loading model:", error);
        // Fallback content if loading fails
        setModelContent(`model
  schema 1.1

# Fallback Content
type user

type doc
  relations
    define owner: [user]
    define viewer: [user, user:*]`);
      }
    };

    loadModel();
  }, []);

  const handleQuery = async () => {
    setIsLoading(true);
    setResult("");
    
    try {
      const answer = await queryDocumentsWithFGA(accessLevel, "Show me forecast for ZEKO?");
      setResult(answer);
    } catch (error) {
      console.error("Error querying documents:", error);
      setResult("Error: Failed to query documents. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
          <Bot className="h-8 w-8" />
          FGA AI Agent
        </h1>
        <p className="text-muted-foreground">
          Query documents with fine-grained authorization using AI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Query</CardTitle>
          <CardDescription>
            This demo will query documents for ZEKO forecast information based on the selected access level.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Access Level:</label>
            <Select value={accessLevel} onValueChange={setAccessLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Public Access
                  </div>
                </SelectItem>
                <SelectItem value="subscriber">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Subscribers
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleQuery}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Querying Documents...
              </>
            ) : (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Query: "Show me forecast for ZEKO?"
              </>
            )}
          </Button>

          {(result || isLoading) && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Results:</label>
              <div className="min-h-[200px] p-4 border rounded-md bg-slate-50">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Select an access level: Public Access or Subscribers</p>
          <p>2. The AI agent loads documents and creates vector embeddings using OpenAI</p>
          <p>5. Only processes documents the user has "viewer" permissions</p>
          <p>6. Returns AI-generated answers based on authorized documents</p>
        </CardContent>
      </Card>
        <ModelPreview model={modelContent} />
      
    </div>
  );
}
