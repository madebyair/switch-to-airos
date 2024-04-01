// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod requirements {
    pub mod check_uefi;
    pub mod check_freespace;
}

pub mod whoami;
pub mod create_magic_folder;
pub mod load_apps;
pub mod write;
pub mod download;
pub mod diskpart;

use requirements::{
    check_uefi::check_uefi,
    check_freespace::check_freespace
};
use std::fs;
use tauri_plugin_log::{Target, TargetKind};
use whoami::whoami;
use whoami::open_explorer;
use create_magic_folder::create_magic_folder;
use load_apps::load_apps;
use write::write;
use download::{download, unzip, download_aria};
use diskpart::diskpart;

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
        .invoke_handler(tauri::generate_handler![check_uefi, check_freespace, whoami, open_explorer, create_magic_folder, load_apps, write, download, unzip, download_aria, diskpart])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
