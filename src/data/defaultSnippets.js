export const codeSnippets = [
  // ==========================================
  // C++ ALGORITHMS (Competitive Programming)
  // ==========================================
  {
    id: 'cpp-binary-search',
    language: 'cpp',
    title: 'Binary Search',
    difficulty: 'Easy',
    code: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;

        if (arr[m] == x)
            return m;

        if (arr[m] < x)
            l = m + 1;
        else
            r = m - 1;
    }
    return -1;
}`
  },
  {
    id: 'cpp-merge-sort',
    language: 'cpp',
    title: 'Merge Sort Implementation',
    difficulty: 'Hard',
    code: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    vector<int> L(n1), R(n2);

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int i = 0; i < n2; i++) R[i] = arr[m + 1 + i];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`
  },
  {
    id: 'cpp-dijkstra',
    language: 'cpp',
    title: 'Dijkstra Shortest Path',
    difficulty: 'Hard',
    code: `void dijkstra(int src) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, INF);

    pq.push({0, src});
    dist[src] = 0;

    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        for (auto x : adj[u]) {
            int v = x.first;
            int weight = x.second;

            if (dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
}`
  },
  {
    id: 'cpp-kadane',
    language: 'cpp',
    title: 'Kadane\'s Algorithm (Max Subarray)',
    difficulty: 'Medium',
    code: `int maxSubArraySum(int a[], int size) {
    int max_so_far = INT_MIN, max_ending_here = 0;

    for (int i = 0; i < size; i++) {
        max_ending_here = max_ending_here + a[i];
        if (max_so_far < max_ending_here)
            max_so_far = max_ending_here;

        if (max_ending_here < 0)
            max_ending_here = 0;
    }
    return max_so_far;
}`
  },
  {
    id: 'cpp-dfs',
    language: 'cpp',
    title: 'Depth First Search (DFS)',
    difficulty: 'Medium',
    code: `void DFS(int u, vector<int> adj[], vector<bool> &visited) {
    visited[u] = true;
    cout << u << " ";

    for (int v : adj[u]) {
        if (!visited[v]) {
            DFS(v, adj, visited);
        }
    }
}`
  },
  {
    id: 'cpp-sieve',
    language: 'cpp',
    title: 'Sieve of Eratosthenes',
    difficulty: 'Easy',
    code: `void sieveOfEratosthenes(int n) {
    vector<bool> prime(n + 1, true);

    for (int p = 2; p * p <= n; p++) {
        if (prime[p] == true) {
            for (int i = p * p; i <= n; i += p)
                prime[i] = false;
        }
    }

    for (int p = 2; p <= n; p++)
        if (prime[p])
            cout << p << " ";
}`
  },

  // ==========================================
  // JAVASCRIPT BACKEND (Express/Node)
  // ==========================================
  {
    id: 'js-auth-controller',
    language: 'javascript',
    title: 'Auth Controller (Login)',
    difficulty: 'Medium',
    code: `const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};`
  },
  {
    id: 'js-middleware-auth',
    language: 'javascript',
    title: 'JWT Auth Middleware',
    difficulty: 'Medium',
    code: `const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};`
  },
  {
    id: 'js-db-connect',
    language: 'javascript',
    title: 'Mongoose DB Connection',
    difficulty: 'Easy',
    code: `const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    } catch (error) {
        console.error(\`Error: \${error.message}\`);
        process.exit(1);
    }
};`
  },
  {
    id: 'js-create-product',
    language: 'javascript',
    title: 'Create Product Controller',
    difficulty: 'Medium',
    code: `const createProduct = async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    
    const product = new Product({
        name,
        price,
        user: req.user._id,
        image,
        brand,
        category,
        countInStock,
        numReviews: 0,
        description
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};`
  },
  {
    id: 'js-error-handler',
    language: 'javascript',
    title: 'Global Error Handler',
    difficulty: 'Easy',
    code: `const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};`
  },
  {
    id: 'js-async-handler',
    language: 'javascript',
    title: 'Async Handler Wrapper',
    difficulty: 'Easy',
    code: `const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;`
  },

  // ==========================================
  // PYTHON MACHINE LEARNING (Data Science)
  // ==========================================
  {
    id: 'py-linear-regression',
    language: 'python',
    title: 'Linear Regression (Scikit)',
    difficulty: 'Medium',
    code: `from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import metrics

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

regressor = LinearRegression()
regressor.fit(X_train, y_train)

y_pred = regressor.predict(X_test)

print('Mean Absolute Error:', metrics.mean_absolute_error(y_test, y_pred))
print('Mean Squared Error:', metrics.mean_squared_error(y_test, y_pred))`
  },
  {
    id: 'py-pandas-cleaning',
    language: 'python',
    title: 'Pandas Data Cleaning',
    difficulty: 'Easy',
    code: `import pandas as pd
import numpy as np

df = pd.read_csv('dataset.csv')

# Handle missing values
df['Age'].fillna(df['Age'].mean(), inplace=True)
df.dropna(subset=['Embarked'], inplace=True)

# Convert categorical to numeric
df['Sex'] = df['Sex'].map({'male': 0, 'female': 1})

print(df.describe())
print(df.head())`
  },
  {
    id: 'py-pytorch-nn',
    language: 'python',
    title: 'Simple Neural Network (PyTorch)',
    difficulty: 'Hard',
    code: `import torch.nn as nn
import torch.nn.functional as F

class SimpleNet(nn.Module):
    def __init__(self):
        super(SimpleNet, self).__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = SimpleNet()`
  },
  {
    id: 'py-kmeans',
    language: 'python',
    title: 'K-Means Clustering',
    difficulty: 'Medium',
    code: `from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

wcss = []
for i in range(1, 11):
    kmeans = KMeans(n_clusters=i, init='k-means++', random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)

plt.plot(range(1, 11), wcss)
plt.title('The Elbow Method')
plt.xlabel('Number of clusters')
plt.ylabel('WCSS')
plt.show()`
  },
  {
    id: 'py-decision-tree',
    language: 'python',
    title: 'Decision Tree Classifier',
    difficulty: 'Medium',
    code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score

clf = DecisionTreeClassifier(criterion='entropy', max_depth=3, random_state=0)
clf.fit(X_train, y_train)

y_pred_train = clf.predict(X_train)
y_pred_test = clf.predict(X_test)

print('Training Accuracy: {0:.4f}'.format(accuracy_score(y_train, y_pred_train)))
print('Test Accuracy: {0:.4f}'.format(accuracy_score(y_test, y_pred_test)))`
  },
  {
    id: 'py-tensorflow-compile',
    language: 'python',
    title: 'TensorFlow Model Compile',
    difficulty: 'Medium',
    code: `import tensorflow as tf

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10)
])

loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

model.compile(optimizer='adam',
              loss=loss_fn,
              metrics=['accuracy'])`
  }
];