<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePhotosTable extends Migration
{
    /**
     * Menjalankan migrasi untuk membuat tabel photos.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained()->onDelete('cascade');  // Menyambungkan dengan tabel albums
            $table->string('path');  // Menyimpan path atau URL foto
            $table->text('caption')->nullable();  // Deskripsi foto
            $table->timestamps();  // Untuk created_at dan updated_at
        });
    }

    /**
     * Membalikkan migrasi.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photos');
    }
}
