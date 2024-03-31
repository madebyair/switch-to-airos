use std::fs;

#[tauri::command]
pub fn write(file: String, content: String) {
    fs::write(file, content).expect("Failed to write file");
}