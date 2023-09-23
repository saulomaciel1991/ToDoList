import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.sm.todolist.ionic',
  appName: 'ToDoList',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
