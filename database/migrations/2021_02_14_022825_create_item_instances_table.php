<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemInstancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item_instances', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('storage_area_id')->unsigned();
            $table->bigInteger('item_id')->unsigned();
            $table->integer('quantity')->unsigned();
            $table->timestamps();

            $table->foreign('storage_area_id')->references('id')->on('storage_areas')
                ->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('items')
                ->onDelete('cascade');
            $table->unique(['storage_area_id', 'item_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('item_instances');
    }
}
