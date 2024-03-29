use sysinfo::Disks;


#[tauri::command]
pub fn check_freespace() -> bool {
    let disks = Disks::new_with_refreshed_list();
    for disk in &disks {
        if disk.mount_point().to_str() == Some("C:\\") {
            if disk.available_space() <=  68719476736 {
                return false;
            }

            return true;
        }
    }

    panic!(r"No C:\ disk found!");
}