module.exports = {
  apps: [
    {
      name: 'hall-of-heroes-backend',
      cwd: './apps/backend',
      script: 'npx',
      args: 'tsx src/server.ts',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      },
      max_memory_restart: '500M',
      time: true
    }
  ]
} 