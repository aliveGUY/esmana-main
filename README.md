## Back

```
yarn build
```

```
tar -czvf nestjs-app.tar.gz dist package.json package-lock.json node_modules
```

```
scp nestjs-app.tar.gz user@your-ip:/home/user/www
```

```
ssh user@your-ip
```

```
tar -xzvf nestjs-app.tar.gz
```

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

```
. ~/.bashrc
```

```
npm install pm2 -g
```

```
pm2 restart app_name
```

## Front 

```
yarn build
```

```
tar -czvf app.tar.gz build
```

```
scp app.tar.gz user@your-ip:/home/user/www
```

```
ssh user@your-ip
```

```
tar -xzvf app.tar.gz
```