
import { Cluster, Deployment, Pod, Service } from "../types/kubernetes";

export const dummyClusters: Cluster[] = [
  {
    id: "c1",
    name: "production-cluster",
    provider: "AWS",
    version: "v1.26.5",
    nodes: 5,
    status: "Connected",
    cpuUsage: 42,
    memoryUsage: 38,
    pods: {
      running: 18,
      total: 20
    }
  },
  {
    id: "c2",
    name: "staging-cluster",
    provider: "GCP",
    version: "v1.25.9",
    nodes: 3,
    status: "Connected",
    cpuUsage: 28,
    memoryUsage: 32,
    pods: {
      running: 12,
      total: 12
    }
  },
  {
    id: "c3",
    name: "dev-cluster",
    provider: "Local",
    version: "v1.27.1",
    nodes: 1,
    status: "Connected",
    cpuUsage: 15,
    memoryUsage: 22,
    pods: {
      running: 5,
      total: 6
    }
  }
];

export const dummyDeployments: Deployment[] = [
  {
    id: "d1",
    name: "frontend-app",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T10:12:35Z",
    replicas: {
      desired: 3,
      available: 3
    },
    image: "company/frontend:v1.2.0"
  },
  {
    id: "d2",
    name: "backend-api",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T08:45:12Z",
    replicas: {
      desired: 2,
      available: 2
    },
    image: "company/backend:v2.1.1"
  },
  {
    id: "d3",
    name: "database",
    namespace: "db",
    status: "Running",
    createdAt: "2023-04-14T14:22:08Z",
    replicas: {
      desired: 1,
      available: 1
    },
    image: "postgres:14.2"
  },
  {
    id: "d4",
    name: "cache",
    namespace: "cache",
    status: "Running",
    createdAt: "2023-04-14T14:25:18Z",
    replicas: {
      desired: 2,
      available: 2
    },
    image: "redis:7.0"
  },
  {
    id: "d5",
    name: "monitoring",
    namespace: "monitoring",
    status: "Pending",
    createdAt: "2023-04-16T09:10:45Z",
    replicas: {
      desired: 1,
      available: 0
    },
    image: "prometheus/prometheus:v2.37.0"
  }
];

export const dummyPods: Pod[] = [
  {
    id: "p1",
    name: "frontend-app-7d8f9c5b7b-xz2v5",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T10:12:35Z",
    cpu: "12m",
    memory: "64Mi",
    restarts: 0
  },
  {
    id: "p2",
    name: "frontend-app-7d8f9c5b7b-a9b3c",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T10:12:40Z",
    cpu: "15m",
    memory: "72Mi",
    restarts: 0
  },
  {
    id: "p3",
    name: "frontend-app-7d8f9c5b7b-g4h5j",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T10:12:45Z",
    cpu: "10m",
    memory: "68Mi",
    restarts: 0
  },
  {
    id: "p4",
    name: "backend-api-5c7d69b548-7j8k9",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T08:45:20Z",
    cpu: "45m",
    memory: "156Mi",
    restarts: 1
  },
  {
    id: "p5",
    name: "backend-api-5c7d69b548-l3m4n",
    namespace: "default",
    status: "Running",
    createdAt: "2023-04-15T08:45:25Z",
    cpu: "48m",
    memory: "162Mi",
    restarts: 0
  },
  {
    id: "p6",
    name: "database-75d88b9c78-p5q6r",
    namespace: "db",
    status: "Running",
    createdAt: "2023-04-14T14:22:15Z",
    cpu: "125m",
    memory: "450Mi",
    restarts: 0
  },
  {
    id: "p7",
    name: "cache-f54f849bd-s7t8u",
    namespace: "cache",
    status: "Running",
    createdAt: "2023-04-14T14:25:25Z",
    cpu: "32m",
    memory: "210Mi",
    restarts: 0
  },
  {
    id: "p8",
    name: "cache-f54f849bd-v9w1x",
    namespace: "cache", 
    status: "Running",
    createdAt: "2023-04-14T14:25:30Z",
    cpu: "30m",
    memory: "205Mi",
    restarts: 0
  },
  {
    id: "p9",
    name: "monitoring-7b9c6d5f4d-y2z3a",
    namespace: "monitoring",
    status: "Pending",
    createdAt: "2023-04-16T09:10:50Z",
    cpu: "0m",
    memory: "0Mi",
    restarts: 0
  }
];

export const dummyServices: Service[] = [
  {
    id: "s1",
    name: "frontend-service",
    namespace: "default",
    type: "LoadBalancer",
    clusterIP: "10.96.45.12",
    ports: [
      {
        port: 80,
        targetPort: 8080,
        protocol: "TCP"
      }
    ]
  },
  {
    id: "s2",
    name: "backend-service",
    namespace: "default",
    type: "ClusterIP",
    clusterIP: "10.96.78.34",
    ports: [
      {
        port: 8000,
        targetPort: 8000,
        protocol: "TCP"
      },
      {
        port: 9000,
        targetPort: 9000,
        protocol: "TCP"
      }
    ]
  },
  {
    id: "s3",
    name: "database-service",
    namespace: "db",
    type: "ClusterIP",
    clusterIP: "10.96.12.56",
    ports: [
      {
        port: 5432,
        targetPort: 5432,
        protocol: "TCP"
      }
    ]
  },
  {
    id: "s4",
    name: "cache-service",
    namespace: "cache",
    type: "ClusterIP",
    clusterIP: "10.96.89.01",
    ports: [
      {
        port: 6379,
        targetPort: 6379,
        protocol: "TCP"
      }
    ]
  }
];

export const defaultYamlConfig = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
  namespace: default
  labels:
    app: example
spec:
  replicas: 1
  selector:
    matchLabels:
      app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: example-app
        image: nginx:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "200m"
---
apiVersion: v1
kind: Service
metadata:
  name: example-service
  namespace: default
spec:
  selector:
    app: example
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP`;
