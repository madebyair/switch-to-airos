use std::thread;
use std::process::Command;

#[tauri::command]
pub fn load_apps() {
    let handler = thread::spawn(|| {
        Command::new("powershell")
                .arg("-Command")
                .arg("winget list > C:\\airos\\apps")
                .output()
                .expect("failed to execute process");
    });

    handler.join().unwrap();
}