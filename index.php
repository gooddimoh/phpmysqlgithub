<?php

class newdb {
    public function convert_sqlite_to_arr($path);
    public function  convert_arr_to_sqlite($arr, $path);
}

$newdb = new newdb;

$newdb->convert_sqlite_to_arr('');
$newdb->convert_arr_to_sqlite('','');
