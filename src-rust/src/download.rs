use std::thread;
use std::process::Command;
use tauri::Manager;

#[tauri::command]
pub fn download(url: String, file: String, window: tauri::Window) {
    thread::spawn(move || {
        let comm = Command::new("powershell")
            .arg("-command")
            .arg(format!("curl -O {} {}", file, url))
            .output()
            .expect("failed to execute process");

        println!("{}", String::from_utf8_lossy(&comm.stdout));


        window.emit("download-finished", url).unwrap();
    });
}


#[tauri::command]
pub fn download_aria(url: String, file: String, window: tauri::Window) {
    thread::spawn(move || {
        let comm = Command::new("powershell")
            .arg("-command")
            .arg(format!("cd C:\\airos ; C:\\airos\\aria2-1.37.0-win-64bit-build1\\aria2c.exe -o {} {} --disable-ipv6", file, url))
            .output()
            .expect("failed to execute process");

        println!("{}", String::from_utf8_lossy(&comm.stdout));

        window.emit("download-finished", url).unwrap();
    });
}

#[tauri::command]
pub fn unzip(file: String) {
    Command::new("powershell")
        .arg("-command")
        .arg(format!("Expand-Archive -Path {} -DestinationPath C:\\airos", file))
        .output()
        .expect("failed to execute process. Windows sucks.");
}