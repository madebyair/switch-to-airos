use std::thread;
use std::fs;
use std::process::Command;
use std::time::Duration;

#[tauri::command]
pub fn diskpart() {
    let handler = thread::spawn(|| {
        fs::write("C:\\airos\\dp_script1", "select disk 0\nlist part").unwrap();

        Command::new("powershell")
            .arg("-command")
            .arg("Start-Process -FilePath powershell -ArgumentList \"-command diskpart /s C:\\airos\\dp_script1 | Out-File -FilePath C:\\airos\\dp_out1 -Encoding utf8\" -Verb runas")
            .output()
            .unwrap();

        let millis = Duration::from_millis(1000);
        thread::sleep(millis);

        let file = fs::read_to_string("C:\\airos\\dp_out1").unwrap();

        println!("{}", file);
    });

    handler.join().unwrap();
}
