<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Image;
use App\Models\Photo;


class TotalStorageUsed extends BaseWidget
{
    protected static ?int $sort = 3;

    protected function getColumns(): int
    {
        return 2; // This makes the widget take half of the screen
    }

    protected function getStats(): array
    {
        return [

            Stat::make('Total Storage Used', number_format(Image::sum('file_size') / 1048576, 2) . ' MB')
                ->description('Total storage used by uploaded images')
                ->icon('heroicon-o-server'),

            Stat::make('Total Storage Used', number_format(Photo::sum('file_size') / 1048576, 2) . ' MB')
                ->description("Total storage used by uploaded album's photos")
                ->icon('heroicon-o-server'),

        ];
        
    }
}
