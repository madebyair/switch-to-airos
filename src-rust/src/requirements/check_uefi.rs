use std::process::Command;
use std::thread;
use std::fs;
use std::time::Duration;

#[tauri::command]
pub fn check_uefi() -> bool {
    Command::new("powershell")
        .arg("-Command")
        .arg(
            "Start-Process cmd.exe -ArgumentList '/c bcdedit > C:\\airos\\bcdedit' -Verb RunAs"
        )
        .output()
        .expect("failed to execute process");

    let millis = Duration::from_millis(500);

    thread::sleep(millis);


    let file = fs::read_to_string("C:\\airos\\bcdedit").unwrap();

    file.contains("winload.efi")
}
