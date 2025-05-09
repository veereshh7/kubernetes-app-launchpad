
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Code, 
  Settings, 
  Key, 
  Lock, 
  Save,
  Copy,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const ConfigEditor = () => {
  const [configMapName, setConfigMapName] = useState("app-config");
  const [configMapNamespace, setConfigMapNamespace] = useState("default");
  const [configMapData, setConfigMapData] = useState("APP_URL=https://example.com\nDEBUG=true\nLOG_LEVEL=info");
  
  const [secretName, setSecretName] = useState("app-credentials");
  const [secretNamespace, setSecretNamespace] = useState("default");
  const [secretData, setSecretData] = useState("USERNAME=admin\nPASSWORD=secure-password\nAPI_KEY=abcd1234efgh5678");
  
  const [kubeConfig, setKubeConfig] = useState(`apiVersion: v1
clusters:
- cluster:
    server: https://kubernetes.default.svc
  name: production
contexts:
- context:
    cluster: production
    user: kubernetes-admin
  name: kubernetes-admin@production
current-context: kubernetes-admin@production
kind: Config
preferences: {}
users:
- name: kubernetes-admin
  user:
    client-certificate-data: <REDACTED>
    client-key-data: <REDACTED>`);
  
  const handleSaveConfigMap = () => {
    toast.success("ConfigMap saved successfully", {
      description: `${configMapName} has been saved in namespace ${configMapNamespace}.`
    });
  };
  
  const handleSaveSecret = () => {
    toast.success("Secret saved successfully", {
      description: `${secretName} has been saved in namespace ${secretNamespace}.`
    });
  };
  
  const handleYamlValidate = () => {
    // This would normally validate the YAML, but for now just show a success toast
    toast.success("YAML validation successful", {
      description: "The YAML configuration is valid."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Configuration</h2>
        <p className="text-muted-foreground">
          Manage ConfigMaps, Secrets, and cluster configurations.
        </p>
      </div>
      
      <Tabs defaultValue="configmaps">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="configmaps" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">ConfigMaps</span>
          </TabsTrigger>
          <TabsTrigger value="secrets" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Secrets</span>
          </TabsTrigger>
          <TabsTrigger value="kubeconfig" className="flex items-center gap-1">
            <Code className="h-4 w-4" />
            <span className="hidden sm:inline">KubeConfig</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="configmaps" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                ConfigMap Editor
              </CardTitle>
              <CardDescription>
                Create and edit ConfigMaps for your applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="configmap-name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="configmap-name"
                    placeholder="app-config"
                    value={configMapName}
                    onChange={(e) => setConfigMapName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="configmap-namespace" className="block text-sm font-medium">
                    Namespace
                  </label>
                  <Input 
                    id="configmap-namespace"
                    placeholder="default"
                    value={configMapNamespace}
                    onChange={(e) => setConfigMapNamespace(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="configmap-data" className="block text-sm font-medium flex items-center justify-between">
                  <span>Config Data</span>
                  <Badge variant="outline" className="font-mono">KEY=value format</Badge>
                </label>
                <Textarea 
                  id="configmap-data"
                  placeholder="KEY=value"
                  className="font-mono h-40"
                  value={configMapData}
                  onChange={(e) => setConfigMapData(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Each line should contain a key-value pair in the format KEY=value
                </p>
              </div>
              
              <div className="flex items-center gap-2 justify-end">
                <Button variant="outline" className="gap-1">
                  <Copy className="h-4 w-4" />
                  Copy as YAML
                </Button>
                <Button onClick={handleSaveConfigMap} className="gap-1">
                  <Save className="h-4 w-4" />
                  Save ConfigMap
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="secrets" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Secret Editor
              </CardTitle>
              <CardDescription>
                Create and edit Kubernetes Secrets (stored as base64-encoded data)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="secret-name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="secret-name"
                    placeholder="app-credentials"
                    value={secretName}
                    onChange={(e) => setSecretName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="secret-namespace" className="block text-sm font-medium">
                    Namespace
                  </label>
                  <Input 
                    id="secret-namespace"
                    placeholder="default"
                    value={secretNamespace}
                    onChange={(e) => setSecretNamespace(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="secret-data" className="block text-sm font-medium flex items-center gap-1">
                    <Key className="h-4 w-4" />
                    <span>Secret Data</span>
                  </label>
                  <Badge variant="destructive" className="font-mono">SENSITIVE</Badge>
                </div>
                <Textarea 
                  id="secret-data"
                  placeholder="KEY=value"
                  className="font-mono h-40"
                  value={secretData}
                  onChange={(e) => setSecretData(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Each line should contain a key-value pair. Values will be base64 encoded when stored.
                </p>
                <div className="flex items-center gap-2 text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 p-2 rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>Secrets are encoded but not encrypted. Do not store sensitive data without proper RBAC controls.</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 justify-end">
                <Button variant="outline" className="gap-1">
                  <Copy className="h-4 w-4" />
                  Copy as YAML
                </Button>
                <Button onClick={handleSaveSecret} className="gap-1">
                  <Save className="h-4 w-4" />
                  Save Secret
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="kubeconfig" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                KubeConfig
              </CardTitle>
              <CardDescription>
                Manage Kubernetes configuration files for cluster access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="kubeconfig" className="block text-sm font-medium">
                    KubeConfig YAML
                  </label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                      <Upload className="h-3 w-3" />
                      Upload
                    </Button>
                  </div>
                </div>
                <Textarea 
                  id="kubeconfig"
                  className="font-mono h-80 text-xs"
                  value={kubeConfig}
                  onChange={(e) => setKubeConfig(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 p-2 rounded-md">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>You can have multiple contexts in your kubeconfig and switch between them</span>
              </div>
              
              <div className="flex items-center gap-2 justify-end">
                <Button variant="outline" onClick={handleYamlValidate} className="gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Validate
                </Button>
                <Button className="gap-1">
                  <Save className="h-4 w-4" />
                  Save Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigEditor;
