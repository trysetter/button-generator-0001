module.exports = {
  apps: [{
    name: 'whatsapp-widget',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '200M',
    env: {
      NODE_ENV: 'production'
    },
    kill_timeout: 1000,
    wait_ready: true,
    listen_timeout: 3000,
    force: true,
    exp_backoff_restart_delay: 100
  }]
}; 