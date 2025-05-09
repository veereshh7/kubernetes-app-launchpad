
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  ArrowRight, 
  Package, 
  Server, 
  Network, 
  Database, 
  Sliders,
  Upload
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { defaultYamlConfig } from "@/lib/dummyData";

const DeploymentForm = () => {
  const [deploymentTab, setDeploymentTab] = useState("wizard");
  const [deploymentStep, setDeploymentStep] = useState(1);
  const [deploymentName, setDeploymentName] = useState("");
  const [namespace, setNamespace] = useState("default");
  const [image, setImage] = useState("");
  const [replicas, setReplicas] = useState("1");
  const [port, setPort] = useState("80");
  const [cpuRequest, setCpuRequest] = useState("100m");
  const [memoryRequest, setMemoryRequest] = useState("128Mi");
  const [yamlConfig, setYamlConfig] = useState(defaultYamlConfig);
  
  const handleNextStep = () => {
    if (deploymentStep < 4) {
      setDeploymentStep(deploymentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (deploymentStep > 1) {
      setDeploymentStep(deploymentStep - 1);
    }
  };
  
  const handleDeploy = () => {
    toast.success("Deployment created successfully", {
      description: `${deploymentName} has been scheduled for deployment.`
    });
    
    // Reset form
    setDeploymentName("");
    setNamespace("default");
    setImage("");
    setReplicas("1");
    setPort("80");
    setCpuRequest("100m");
    setMemoryRequest("128Mi");
    setDeploymentStep(1);
  };
  
  const handleYamlDeploy = () => {
    toast.success("YAML configuration applied", {
      description: "The resources defined in your YAML have been scheduled for deployment."
    });
    setYamlConfig(defaultYamlConfig);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Deploy Application</h2>
        <p className="text-muted-foreground">
          Deploy a new application to your Kubernetes cluster using a wizard or YAML configuration.
        </p>
      </div>
      
      <Tabs defaultValue="wizard" value={deploymentTab} onValueChange={setDeploymentTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="wizard">
            <Package className="h-4 w-4 mr-2" />
            Wizard
          </TabsTrigger>
          <TabsTrigger value="yaml">
            <Upload className="h-4 w-4 mr-2" />
            YAML
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="wizard" className="pt-4">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    deploymentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {deploymentStep > 1 ? <Check className="h-5 w-5" /> : 1}
                </div>
                <span className={deploymentStep >= 1 ? "font-medium" : "text-muted-foreground"}>
                  Basic Info
                </span>
              </div>
              <div className="hidden sm:block w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    deploymentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {deploymentStep > 2 ? <Check className="h-5 w-5" /> : 2}
                </div>
                <span className={deploymentStep >= 2 ? "font-medium" : "text-muted-foreground"}>
                  Container
                </span>
              </div>
              <div className="hidden sm:block w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    deploymentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {deploymentStep > 3 ? <Check className="h-5 w-5" /> : 3}
                </div>
                <span className={deploymentStep >= 3 ? "font-medium" : "text-muted-foreground"}>
                  Resources
                </span>
              </div>
              <div className="hidden sm:block w-12 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    deploymentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  4
                </div>
                <span className={deploymentStep >= 4 ? "font-medium" : "text-muted-foreground"}>
                  Review
                </span>
              </div>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {deploymentStep === 1 && "Basic Information"}
                {deploymentStep === 2 && "Container Configuration"}
                {deploymentStep === 3 && "Resource Allocation"}
                {deploymentStep === 4 && "Review Deployment"}
              </CardTitle>
              <CardDescription>
                {deploymentStep === 1 && "Provide basic details about your deployment"}
                {deploymentStep === 2 && "Configure the container for your application"}
                {deploymentStep === 3 && "Set resource requests and limits"}
                {deploymentStep === 4 && "Review your deployment configuration"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Basic Information */}
              {deploymentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deployment-name">Deployment Name</Label>
                      <Input 
                        id="deployment-name"
                        placeholder="my-application"
                        value={deploymentName}
                        onChange={(e) => setDeploymentName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="namespace">Namespace</Label>
                      <Select value={namespace} onValueChange={setNamespace}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select namespace" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">default</SelectItem>
                          <SelectItem value="kube-system">kube-system</SelectItem>
                          <SelectItem value="monitoring">monitoring</SelectItem>
                          <SelectItem value="app">app</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="labels">Labels (optional)</Label>
                    <Input 
                      id="labels"
                      placeholder="app=frontend,tier=web"
                    />
                    <p className="text-xs text-muted-foreground">
                      Comma-separated key=value pairs for labeling resources
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 2: Container Configuration */}
              {deploymentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Container Image</Label>
                    <Input 
                      id="image"
                      placeholder="nginx:latest"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Docker image to use for this deployment
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="replicas">Replicas</Label>
                      <Input 
                        id="replicas"
                        type="number" 
                        min="1"
                        value={replicas}
                        onChange={(e) => setReplicas(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Container Port</Label>
                      <Input 
                        id="port"
                        type="number"
                        placeholder="80"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="env-vars">Environment Variables (optional)</Label>
                    <Textarea 
                      id="env-vars"
                      placeholder="KEY=value&#10;ANOTHER_KEY=another_value"
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      One environment variable per line in KEY=value format
                    </p>
                  </div>
                </div>
              )}
              
              {/* Step 3: Resource Allocation */}
              {deploymentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cpu-request">CPU Request</Label>
                      <span className="text-xs text-muted-foreground">
                        Minimum amount of CPU needed
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={cpuRequest} onValueChange={setCpuRequest}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select CPU request" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50m">50m (0.05 CPU)</SelectItem>
                          <SelectItem value="100m">100m (0.1 CPU)</SelectItem>
                          <SelectItem value="250m">250m (0.25 CPU)</SelectItem>
                          <SelectItem value="500m">500m (0.5 CPU)</SelectItem>
                          <SelectItem value="1000m">1000m (1 CPU)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        value={cpuRequest}
                        onChange={(e) => setCpuRequest(e.target.value)}
                        placeholder="e.g. 100m"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="memory-request">Memory Request</Label>
                      <span className="text-xs text-muted-foreground">
                        Minimum amount of memory needed
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={memoryRequest} onValueChange={setMemoryRequest}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select memory request" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="64Mi">64Mi</SelectItem>
                          <SelectItem value="128Mi">128Mi</SelectItem>
                          <SelectItem value="256Mi">256Mi</SelectItem>
                          <SelectItem value="512Mi">512Mi</SelectItem>
                          <SelectItem value="1Gi">1Gi</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        value={memoryRequest}
                        onChange={(e) => setMemoryRequest(e.target.value)}
                        placeholder="e.g. 128Mi"
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Create Service</Label>
                      <span className="text-xs text-muted-foreground">
                        Expose deployment with a Service
                      </span>
                    </div>
                    <Select defaultValue="ClusterIP">
                      <SelectTrigger>
                        <SelectValue placeholder="Service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">No Service</SelectItem>
                        <SelectItem value="ClusterIP">ClusterIP (internal only)</SelectItem>
                        <SelectItem value="NodePort">NodePort (accessible on nodes)</SelectItem>
                        <SelectItem value="LoadBalancer">LoadBalancer (external access)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {/* Step 4: Review */}
              {deploymentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto font-mono">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${deploymentName || "example-deployment"}
  namespace: ${namespace}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${deploymentName || "example"}
  template:
    metadata:
      labels:
        app: ${deploymentName || "example"}
    spec:
      containers:
      - name: ${deploymentName || "example"}-container
        image: ${image || "nginx:latest"}
        ports:
        - containerPort: ${port}
        resources:
          requests:
            memory: "${memoryRequest}"
            cpu: "${cpuRequest}"
          limits:
            memory: "${
              memoryRequest === "64Mi" ? "128Mi" :
              memoryRequest === "128Mi" ? "256Mi" :
              memoryRequest === "256Mi" ? "512Mi" :
              memoryRequest === "512Mi" ? "1Gi" :
              "2Gi"
            }"
            cpu: "${
              cpuRequest === "50m" ? "100m" :
              cpuRequest === "100m" ? "200m" :
              cpuRequest === "250m" ? "500m" :
              cpuRequest === "500m" ? "1000m" :
              "2000m"
            }"
---
apiVersion: v1
kind: Service
metadata:
  name: ${deploymentName || "example"}-service
  namespace: ${namespace}
spec:
  selector:
    app: ${deploymentName || "example"}
  ports:
  - port: ${port}
    targetPort: ${port}
  type: ClusterIP`}
                    </pre>
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="gap-2"
                      onClick={handleDeploy}
                    >
                      <Server className="h-4 w-4" />
                      Deploy Application
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="ghost" 
                onClick={handlePrevStep}
                disabled={deploymentStep === 1}
              >
                Previous
              </Button>
              {deploymentStep < 4 ? (
                <Button onClick={handleNextStep} className="gap-2">
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="yaml" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                YAML Configuration
              </CardTitle>
              <CardDescription>
                Deploy applications using Kubernetes YAML manifests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="yaml-config">YAML Configuration</Label>
                  <Textarea 
                    id="yaml-config"
                    className="min-h-[400px] font-mono text-sm"
                    value={yamlConfig}
                    onChange={(e) => setYamlConfig(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="default" 
                    className="gap-2"
                    onClick={handleYamlDeploy}
                  >
                    <Upload className="h-4 w-4" />
                    Apply YAML
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeploymentForm;
