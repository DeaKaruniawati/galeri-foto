<?php

namespace App\Filament\Resources\AlbumResource\RelationManagers;

use App\Models\Photo;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;

class PhotosRelationManager extends RelationManager
{
    protected static string $relationship = 'photos';

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('path')->label('Preview'),
                TextColumn::make('created_at')->label('Uploaded At')->date(),
            ]);
    }
}
