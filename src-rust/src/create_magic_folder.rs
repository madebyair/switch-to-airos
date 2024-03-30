use std::{env, fs};

#[tauri::command]
pub fn create_magic_folder() {
    if let Some(user_profile) = env::var_os("USERPROFILE") {
        if let Some(user_profile_str) = user_profile.to_str() {
            let desktop_path = format!("{}\\Desktop", user_profile_str);
            let magic_folder_path = format!("{}\\Magic Folder", desktop_path);

            fs::create_dir(&magic_folder_path).unwrap_or(());

            fs::write("C:\\airos\\magicfolder", &magic_folder_path).unwrap();
        }
    }
}
