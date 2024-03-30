// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod requirements {
    pub mod check_uefi;
    pub mod check_freespace;
}

use requirements::{
    check_uefi::check_uefi,
    check_freespace::check_freespace
};
use std::fs;
use tauri_plugin_log::{Target, TargetKind};

fn main() {
    fs::remove_dir_all("C:\\airos").unwrap_or(());
    fs::create_dir("C:\\airos").unwrap_or(());

    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(
            tauri_plugin_log::Builder::new()
                .targets([
                    Target::new(TargetKind::Stdout),
                    Target::new(TargetKind::LogDir {
                        file_name: Some("C:\\airos\\current.log".to_string()),
                    }),
                ])
                .build(),
        )
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![check_uefi, check_freespace])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
