
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Cloud,
  Shield, 
  Layers
} from "lucide-react";
import { dummyClusters, dummyDeployments, dummyPods, dummyServices } from "@/lib/dummyData";

const ClusterOverview = () => {
  const cluster = dummyClusters[0]; // Using the first cluster for now
  
  const healthyDeployments = dummyDeployments.filter(d => d.status === "Running").length;
  const totalDeployments = dummyDeployments.length;
  
  const healthyPods = dummyPods.filter(p => p.status === "Running").length;
  const totalPods = dummyPods.length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-k8s-blue" />
              CPU Usage
            </CardTitle>
            <CardDescription>Current utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{cluster.cpuUsage}%</span>
              <Badge 
                variant={cluster.cpuUsage > 80 ? "destructive" : 
                        cluster.cpuUsage > 60 ? "default" : 
                        "outline"} 
                className="ml-auto"
              >
                {cluster.cpuUsage > 80 ? "High" : 
                 cluster.cpuUsage > 60 ? "Moderate" : 
                 "Normal"}
              </Badge>
            </div>
            <Progress value={cluster.cpuUsage} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-k8s-teal" />
              Memory Usage
            </CardTitle>
            <CardDescription>Current allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{cluster.memoryUsage}%</span>
              <Badge 
                variant={cluster.memoryUsage > 80 ? "destructive" : 
                        cluster.memoryUsage > 60 ? "default" : 
                        "outline"} 
                className="ml-auto"
              >
                {cluster.memoryUsage > 80 ? "High" : 
                 cluster.memoryUsage > 60 ? "Moderate" : 
                 "Normal"}
              </Badge>
            </div>
            <Progress value={cluster.memoryUsage} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-k8s-green" />
              Pods Status
            </CardTitle>
            <CardDescription>Running/Total pods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{healthyPods}/{totalPods}</span>
              <Badge 
                variant={healthyPods === totalPods ? "outline" : 
                        healthyPods >= totalPods * 0.8 ? "default" : 
                        "destructive"} 
                className="ml-auto"
              >
                {healthyPods === totalPods ? "Healthy" : 
                 healthyPods >= totalPods * 0.8 ? "Partially Healthy" : 
                 "Degraded"}
              </Badge>
            </div>
            <Progress value={(healthyPods/totalPods) * 100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-k8s-yellow" />
              Deployments
            </CardTitle>
            <CardDescription>Healthy/Total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">{healthyDeployments}/{totalDeployments}</span>
              <Badge 
                variant={healthyDeployments === totalDeployments ? "outline" : 
                        healthyDeployments >= totalDeployments * 0.8 ? "default" : 
                        "destructive"} 
                className="ml-auto"
              >
                {healthyDeployments === totalDeployments ? "Healthy" : 
                 healthyDeployments >= totalDeployments * 0.8 ? "Partially Healthy" : 
                 "Degraded"}
              </Badge>
            </div>
            <Progress value={(healthyDeployments/totalDeployments) * 100} className="h-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-k8s-blue" />
              Deployments
            </CardTitle>
            <CardDescription>Recent application deployments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="p-2 pl-3 font-medium">Name</th>
                    <th className="p-2 font-medium">Namespace</th>
                    <th className="p-2 font-medium">Status</th>
                    <th className="p-2 font-medium">Replicas</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyDeployments.slice(0, 4).map((deployment) => (
                    <tr key={deployment.id} className="border-b">
                      <td className="p-2 pl-3">{deployment.name}</td>
                      <td className="p-2">{deployment.namespace}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <div className={
                            `status-indicator ${deployment.status === "Running" ? "status-healthy" : 
                            deployment.status === "Pending" ? "status-warning" : 
                            "status-error"}`
                          }></div>
                          {deployment.status}
                        </div>
                      </td>
                      <td className="p-2">
                        {deployment.replicas.available}/{deployment.replicas.desired}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-k8s-teal" />
              Services
            </CardTitle>
            <CardDescription>Network services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="p-2 pl-3 font-medium">Name</th>
                    <th className="p-2 font-medium">Namespace</th>
                    <th className="p-2 font-medium">Type</th>
                    <th className="p-2 font-medium">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyServices.map((service) => (
                    <tr key={service.id} className="border-b">
                      <td className="p-2 pl-3">{service.name}</td>
                      <td className="p-2">{service.namespace}</td>
                      <td className="p-2">
                        <Badge variant={
                          service.type === "LoadBalancer" ? "default" :
                          service.type === "NodePort" ? "secondary" : "outline"
                        }>
                          {service.type}
                        </Badge>
                      </td>
                      <td className="p-2">{service.clusterIP}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-k8s-yellow" />
            Cluster Information
          </CardTitle>
          <CardDescription>Details about the current cluster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Provider</p>
              <p className="text-lg font-medium">{cluster.provider}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Kubernetes Version</p>
              <p className="text-lg font-medium">{cluster.version}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Nodes</p>
              <p className="text-lg font-medium">{cluster.nodes}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-muted-foreground text-sm">Status</p>
              <div className="flex items-center gap-2">
                <div className={`status-indicator ${cluster.status === "Connected" ? "status-healthy" : "status-error"}`}></div>
                <p className="text-lg font-medium">{cluster.status}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClusterOverview;
