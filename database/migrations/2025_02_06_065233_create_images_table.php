<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id(); // ID auto increment
            $table->string('filename'); // Nama file
            $table->string('file_path'); // Path atau lokasi gambar
            $table->string('file_type'); // Tipe file (misal: image/jpeg)
            $table->unsignedInteger('file_size'); // Ukuran file dalam byte
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ID user yang mengupload
            $table->timestamps(); // Created_at dan updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('images');
    }
}
