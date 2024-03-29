use std::process::Command;
use std::thread;

#[tauri::command]
pub fn check_uefi() {
    let handle = thread::spawn(|| {
        let output = Command::new("powershell")
            .arg("-Command")
            .arg(
                "Start-Process cmd.exe -ArgumentList '/c bcdedit > C:\\airos\\bcdedit' -Verb RunAs",
            )
            .output()
            .expect("failed to execute process");

        println!("status: {}", output.status);
        println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
        println!("stderr: {}", String::from_utf8_lossy(&output.stderr));
    });

    handle.join().unwrap();
}
