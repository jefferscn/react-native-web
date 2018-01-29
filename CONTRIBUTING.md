
## 1. Checkout
We use `port_virtualized_list` branch
```bash
git checkout -b pvl remotes/origin/port_virtualized_list

```

## 2. Install
```bash
npm install
```

## 3. Modify `react-native-web`

## 4. Compile
```bash
npm run compile --watch
```

## 5. link

### 5.1 (In react-native-web directory)

```bash
npm link
```

### 5.2 (In src directory)

```bash
npm link react-native-web
```
## 6. Commit
