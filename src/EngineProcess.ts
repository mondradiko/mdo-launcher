const { spawn } = require('child_process');

export default async function LaunchEngineProcess(path: string) {
  // Modify with whatever process path
	const child = spawn("/usr/bin/glxgears", []);

  child.stdout.on('data', (data: string) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data: string) => {
    console.log(`stderr: ${data}`);
  });

  child.on('close', (data: number) => {
    console.log(`child process exited with code ${data}`);
  });
}
