
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Layers,
  Shield, 
  RefreshCw, 
  X, 
  Terminal,
  AlertTriangle,
  Eye
} from "lucide-react";
import { 
  dummyPods, 
  dummyServices,
  dummyDeployments
} from "@/lib/dummyData";
import { Pod, Service, Deployment, ResourceStatus } from "@/types/kubernetes";

const ResourceMonitor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [namespace, setNamespace] = useState("all");
  const [selectedPod, setSelectedPod] = useState<Pod | null>(null);
  
  const filteredPods = dummyPods.filter(pod => {
    const matchesSearch = pod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNamespace = namespace === "all" || pod.namespace === namespace;
    return matchesSearch && matchesNamespace;
  });
  
  const filteredServices = dummyServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNamespace = namespace === "all" || service.namespace === namespace;
    return matchesSearch && matchesNamespace;
  });
  
  const filteredDeployments = dummyDeployments.filter(deployment => {
    const matchesSearch = deployment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNamespace = namespace === "all" || deployment.namespace === namespace;
    return matchesSearch && matchesNamespace;
  });
  
  const getStatusClass = (status: ResourceStatus) => {
    switch (status) {
      case "Running":
        return "status-healthy";
      case "Pending":
        return "status-waiting";
      case "Failed":
        return "status-error";
      case "Succeeded":
        return "status-healthy";
      default:
        return "status-inactive";
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Resource Monitor</h2>
        <p className="text-muted-foreground">
          Monitor the status of various resources in your Kubernetes cluster.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select value={namespace} onValueChange={setNamespace}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by namespace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All namespaces</SelectItem>
              <SelectItem value="default">default</SelectItem>
              <SelectItem value="kube-system">kube-system</SelectItem>
              <SelectItem value="monitoring">monitoring</SelectItem>
              <SelectItem value="db">db</SelectItem>
              <SelectItem value="cache">cache</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {selectedPod ? (
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className={`status-indicator ${getStatusClass(selectedPod.status)}`}></div>
                  {selectedPod.name}
                </CardTitle>
                <CardDescription>Pod details</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPod(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Namespace</p>
                  <p className="font-medium">{selectedPod.namespace}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`status-indicator ${getStatusClass(selectedPod.status)}`}></div>
                    <p className="font-medium">{selectedPod.status}</p>
                  </div>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Restarts</p>
                  <p className={`font-medium ${selectedPod.restarts > 0 ? "text-k8s-yellow" : ""}`}>
                    {selectedPod.restarts}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">CPU Usage</p>
                  <p className="font-medium">{selectedPod.cpu}</p>
                </div>
                <div className="bg-muted/30 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground mb-1">Memory Usage</p>
                  <p className="font-medium">{selectedPod.memory}</p>
                </div>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Created</p>
                <p className="font-medium">
                  {new Date(selectedPod.createdAt).toLocaleString()}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span className="font-medium">Logs</span>
                </div>
                <div className="bg-card border rounded-md p-3">
                  <pre className="text-xs font-mono overflow-auto max-h-40 text-left whitespace-pre-wrap">
                    {selectedPod.status === "Running" ? (
                      `Started container with id 8d0e8d0e8d0e
Listening on port ${selectedPod.name.includes("frontend") ? "8080" : "5000"}
Connected to service...
Processing request from 10.0.0.1...
Request completed with status 200
Processing request from 10.0.0.5...
Request completed with status 200
`
                    ) : selectedPod.status === "Pending" ? (
                      "Waiting for resources to be available..."
                    ) : (
                      "Error: Could not start container. See events for details."
                    )}
                  </pre>
                </div>
              </div>
              
              <div className="flex items-center gap-2 justify-end">
                <Button variant="outline" className="gap-2">
                  <Terminal className="h-4 w-4" />
                  Shell
                </Button>
                <Button variant="outline" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Events
                </Button>
                <Button variant="destructive" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <div className={selectedPod ? "lg:col-span-1" : "lg:col-span-3"}>
          <Tabs defaultValue="pods">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pods" className="flex items-center gap-1">
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Pods</span>
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
              </TabsTrigger>
              <TabsTrigger value="deployments" className="flex items-center gap-1">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Deployments</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pods" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-left">
                          <th className="p-2 pl-3 font-medium">Name</th>
                          <th className="p-2 font-medium hidden sm:table-cell">Status</th>
                          <th className="p-2 font-medium hidden md:table-cell">Restarts</th>
                          <th className="p-2 font-medium hidden lg:table-cell">CPU/Mem</th>
                          <th className="p-2 font-medium text-right"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPods.length > 0 ? (
                          filteredPods.map((pod) => (
                            <tr key={pod.id} className="border-b">
                              <td className="p-2 pl-3">
                                <div>
                                  <p className="font-medium truncate max-w-[150px]">{pod.name}</p>
                                  <p className="text-xs text-muted-foreground">{pod.namespace}</p>
                                </div>
                              </td>
                              <td className="p-2 hidden sm:table-cell">
                                <div className="flex items-center gap-2">
                                  <div className={`status-indicator ${getStatusClass(pod.status)}`}></div>
                                  {pod.status}
                                </div>
                              </td>
                              <td className="p-2 hidden md:table-cell">
                                <span className={pod.restarts > 0 ? "text-k8s-yellow" : ""}>
                                  {pod.restarts}
                                </span>
                              </td>
                              <td className="p-2 hidden lg:table-cell">
                                {pod.cpu} / {pod.memory}
                              </td>
                              <td className="p-2 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedPod(pod)}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-4 text-center text-muted-foreground">
                              <div className="flex flex-col items-center justify-center py-4">
                                <AlertTriangle className="h-6 w-6 mb-2" />
                                <p>No pods found matching your criteria</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="services" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-left">
                          <th className="p-2 pl-3 font-medium">Name</th>
                          <th className="p-2 font-medium hidden sm:table-cell">Type</th>
                          <th className="p-2 font-medium hidden md:table-cell">Cluster IP</th>
                          <th className="p-2 font-medium hidden lg:table-cell">Ports</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServices.length > 0 ? (
                          filteredServices.map((service) => (
                            <tr key={service.id} className="border-b">
                              <td className="p-2 pl-3">
                                <div>
                                  <p className="font-medium">{service.name}</p>
                                  <p className="text-xs text-muted-foreground">{service.namespace}</p>
                                </div>
                              </td>
                              <td className="p-2 hidden sm:table-cell">
                                <Badge variant="outline">{service.type}</Badge>
                              </td>
                              <td className="p-2 hidden md:table-cell">
                                <span className="font-mono text-xs">{service.clusterIP}</span>
                              </td>
                              <td className="p-2 hidden lg:table-cell">
                                <div className="flex flex-wrap gap-1">
                                  {service.ports.map((port, index) => (
                                    <Badge key={index} variant="secondary" className="font-mono">
                                      {port.port}:{port.targetPort}/{port.protocol}
                                    </Badge>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="p-4 text-center text-muted-foreground">
                              <div className="flex flex-col items-center justify-center py-4">
                                <AlertTriangle className="h-6 w-6 mb-2" />
                                <p>No services found matching your criteria</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="deployments" className="pt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-auto max-h-96">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50 text-left">
                          <th className="p-2 pl-3 font-medium">Name</th>
                          <th className="p-2 font-medium hidden sm:table-cell">Status</th>
                          <th className="p-2 font-medium hidden md:table-cell">Replicas</th>
                          <th className="p-2 font-medium hidden lg:table-cell">Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDeployments.length > 0 ? (
                          filteredDeployments.map((deployment) => (
                            <tr key={deployment.id} className="border-b">
                              <td className="p-2 pl-3">
                                <div>
                                  <p className="font-medium">{deployment.name}</p>
                                  <p className="text-xs text-muted-foreground">{deployment.namespace}</p>
                                </div>
                              </td>
                              <td className="p-2 hidden sm:table-cell">
                                <div className="flex items-center gap-2">
                                  <div className={`status-indicator ${getStatusClass(deployment.status)}`}></div>
                                  {deployment.status}
                                </div>
                              </td>
                              <td className="p-2 hidden md:table-cell">
                                {deployment.replicas.available}/{deployment.replicas.desired}
                              </td>
                              <td className="p-2 hidden lg:table-cell truncate max-w-[150px]">
                                <span className="font-mono text-xs">{deployment.image}</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="p-4 text-center text-muted-foreground">
                              <div className="flex flex-col items-center justify-center py-4">
                                <AlertTriangle className="h-6 w-6 mb-2" />
                                <p>No deployments found matching your criteria</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResourceMonitor;
