<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AlbumResource\Pages;
use App\Filament\Resources\AlbumResource\RelationManagers\PhotosRelationManager;
use App\Models\Album;
use Illuminate\Support\Facades\Storage;
use Filament\Forms;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;

class AlbumResource extends Resource
{
    protected static ?int $navigationSort = 3;

    protected static ?string $model = Album::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable(),
                BadgeColumn::make('photos_count')->label('Photos')->counts('photos')->color('info')->sortable(),
                TextColumn::make('user.name')->label('Created By'),
                BadgeColumn::make('created_at')->date()->sortable()
            ])
            ->searchPlaceholder('Search Album')
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make()
                ->before(function ($record) {
                    foreach ($record->photos as $photo) {
                        if ($photo->path && Storage::disk('public')->exists($photo->path)) {
                            Storage::disk('public')->delete($photo->path);
                        }
                    }
                }),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            PhotosRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAlbums::route('/'),
            'view' => Pages\ViewAlbums::route('/{record}'),
        ];
    }
}
