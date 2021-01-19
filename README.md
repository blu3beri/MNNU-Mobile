# MNNU-Mobile

### Run script
```bash
git pull https://github.com/blu3beri/MNNU-Mobile.git
cd MNNU-Mobile
npm install
npm run build
```

If there is no ionic or capacitor
```bash
npm i -g @ionic/cli
```
```bash
ionic capacitor add android # or ios
ionic capacitor run android --livereload --external # or ios
```

### MNNU-Blockchain
the repository MNNU-BLockchain is also needed to run this.

```bash
git clone https://github.com/blu3beri/MNNU-Blockchain.git
cd MNNU-Blockchain
cp README.md ./mobile/.env
cd mobile
vim .env #edit the data
sh -c (cat README.md) #fish cuz it's better
sh -c ${cat README.md} #other shells, like bash or zsh...
```
