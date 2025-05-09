
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Layout, 
  Cpu, 
  Server, 
  Activity, 
  Settings, 
  Plus, 
  ChevronDown,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dummyClusters } from "@/lib/dummyData";

const Navbar = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
  const [currentCluster, setCurrentCluster] = useState(dummyClusters[0]);
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };
  
  const handleClusterChange = (clusterId: string) => {
    const selected = dummyClusters.find(cluster => cluster.id === clusterId);
    if (selected) {
      setCurrentCluster(selected);
    }
  };
  
  return (
    <div className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-k8s-blue" />
          <h1 className="text-xl font-semibold">Kubernetes Launchpad</h1>
        </div>
        
        <div className="flex-1 mx-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-60">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className={`status-indicator ${
                      currentCluster.status === "Connected" ? "status-healthy" : 
                      currentCluster.status === "Degraded" ? "status-warning" : 
                      "status-error"
                    }`}></div>
                    <span>{currentCluster.name}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              {dummyClusters.map(cluster => (
                <DropdownMenuItem 
                  key={cluster.id}
                  onClick={() => handleClusterChange(cluster.id)}
                  className="flex items-center gap-2"
                >
                  <div className={`status-indicator ${
                    cluster.status === "Connected" ? "status-healthy" : 
                    cluster.status === "Degraded" ? "status-warning" : 
                    "status-error"
                  }`}></div>
                  {cluster.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="text-primary">
                <Plus className="h-4 w-4 mr-2" /> Add Cluster
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={activeTab === "overview" ? "default" : "ghost"} 
            className="gap-1"
            onClick={() => handleTabClick("overview")}
          >
            <Layout className="h-4 w-4" />
            <span className="hidden md:inline">Overview</span>
          </Button>
          <Button 
            variant={activeTab === "deployments" ? "default" : "ghost"} 
            className="gap-1"
            onClick={() => handleTabClick("deployments")}
          >
            <Server className="h-4 w-4" />
            <span className="hidden md:inline">Deployments</span>
          </Button>
          <Button 
            variant={activeTab === "monitor" ? "default" : "ghost"} 
            className="gap-1"
            onClick={() => handleTabClick("monitor")}
          >
            <Activity className="h-4 w-4" />
            <span className="hidden md:inline">Monitor</span>
          </Button>
          <Button 
            variant={activeTab === "config" ? "default" : "ghost"} 
            className="gap-1"
            onClick={() => handleTabClick("config")}
          >
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Config</span>
          </Button>
          <Button variant="destructive" size="icon" className="ml-2">
            <AlertTriangle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
