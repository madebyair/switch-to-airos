use std::thread;
use std::process::Command;
use tauri::Manager;

#[tauri::command]
pub fn download(url: String, file: String, window: tauri::Window) {
    thread::spawn(move || {
        Command::new("powershell")
            .arg("-command")
            .arg(format!("curl -O {} {}", file, url))
            .output()
            .expect("failed to execute process");

        window.emit("download-finished", url).unwrap();
    });
}