module.exports = {
  apps: [{
    name: 'whatsapp-widget',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    shutdown_with_message: true,
    wait_ready: true,
    kill_timeout: 3000
  }]
}; 