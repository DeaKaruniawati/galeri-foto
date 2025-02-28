<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ImageResource\Pages;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\BadgeColumn;

class ImageResource extends Resource
{
    protected static ?int $navigationSort = 2;

    protected static ?string $model = Image::class;

    protected static ?string $navigationIcon = 'bx-images';

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('file_path')->label('Preview')->disk('public')->visibility('public'),
                TextColumn::make('user.name')->label('Uploaded By')->searchable(),
                BadgeColumn::make('created_at')->label('Uploaded At')->date()->sortable(),
            ])
            ->searchPlaceholder('Search User')
            ->actions([
                Tables\Actions\DeleteAction::make()
                ->before(function ($record) {
                    if ($record->file_path && Storage::disk('public')->exists($record->file_path)) {
                        Storage::disk('public')->delete($record->file_path);
                    }
                }),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListImages::route('/'),
        ];
    }
}
