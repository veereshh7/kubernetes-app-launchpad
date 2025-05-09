
export type ResourceStatus = "Running" | "Pending" | "Failed" | "Succeeded" | "Unknown";

export interface Pod {
  id: string;
  name: string;
  namespace: string;
  status: ResourceStatus;
  createdAt: string;
  cpu: string;
  memory: string;
  restarts: number;
}

export interface Service {
  id: string;
  name: string;
  namespace: string;
  type: "ClusterIP" | "NodePort" | "LoadBalancer";
  clusterIP: string;
  ports: {
    port: number;
    targetPort: number;
    protocol: "TCP" | "UDP";
  }[];
}

export interface Deployment {
  id: string;
  name: string;
  namespace: string;
  status: ResourceStatus;
  createdAt: string;
  replicas: {
    desired: number;
    available: number;
  };
  image: string;
}

export interface Cluster {
  id: string;
  name: string;
  provider: "AWS" | "GCP" | "Azure" | "Local" | "Other";
  version: string;
  nodes: number;
  status: "Connected" | "Disconnected" | "Degraded";
  cpuUsage: number;
  memoryUsage: number;
  pods: {
    running: number;
    total: number;
  };
}
