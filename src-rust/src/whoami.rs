use std::process::Command;

#[tauri::command]
pub fn whoami() -> String {
    let comm = Command::new("cmd")
        .arg("/k")
        .arg("whoami")
        .output()
        .expect("failed to execute process");

    let string = String::from_utf8_lossy(&comm.stdout);

    let string = if cfg!(target_os = "windows") {
        let mut parts = string.split("\\");
        if let Some(first_part) = parts.nth(1) {
            first_part.to_string().replace("C:", "").replace("\n", "").replace(" ", "")
        } else {
            String::new()
        }
    } else {
        string.to_string()
    };

    string
}

#[tauri::command]
pub fn open_explorer(path: String) {
    Command::new("cmd")
        .arg("/k")
        .arg(format!("explorer {}", path))
        .output()
        .expect("WINDOWS SUCKSSqewujgrwsvsdjbcxz!");
}
