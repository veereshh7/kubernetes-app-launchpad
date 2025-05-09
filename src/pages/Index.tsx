
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ClusterOverview from "@/components/ClusterOverview";
import DeploymentForm from "@/components/DeploymentForm";
import ResourceMonitor from "@/components/ResourceMonitor";
import ConfigEditor from "@/components/ConfigEditor";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const renderActiveContent = () => {
    switch (activeTab) {
      case "overview":
        return <ClusterOverview />;
      case "deployments":
        return <DeploymentForm />;
      case "monitor":
        return <ResourceMonitor />;
      case "config":
        return <ConfigEditor />;
      default:
        return <ClusterOverview />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onTabChange={setActiveTab} />
      <div className="container mx-auto py-6 flex-1">
        {renderActiveContent()}
      </div>
    </div>
  );
};

export default Index;
