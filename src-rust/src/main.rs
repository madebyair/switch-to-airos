// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod requirements {
    pub mod check_uefi;
}

use std::fs;
use requirements::{
    check_uefi::check_uefi
};

fn main() {
    fs::create_dir("C:\\airos").unwrap_or(());

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![check_uefi])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
