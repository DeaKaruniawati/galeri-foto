<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Image;
use App\Models\User;
use App\Models\Album;

class Total extends BaseWidget
{
    protected static ?int $sort = 2;

    protected function getStats(): array
    {
        return [

            Stat::make('Total Users', User::count())
                ->description('Total registered users')
                ->icon('heroicon-o-users'),

            Stat::make('Total Images', Image::count())
                ->description('Total uploaded images')
                ->icon('bx-images'),

            Stat::make('Total Albums', Album::count())
                ->description('Total created albums')
                ->icon('heroicon-o-rectangle-stack')

        ];
    }
}
