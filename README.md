# How To Recreate

```
# Running dev works fine.
npm install
npx sst dev
npx sst shell --target Prisma -- npx prisma migrate dev

# If you look at the logs, you will see errors about loading prisma.
npx sst deploy --stage test 
```