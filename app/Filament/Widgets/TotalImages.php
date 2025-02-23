<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Image;
use Carbon\Carbon;

class TotalImages extends BaseWidget
{
    protected function getStats(): array
    {
        return [

            Stat::make('Total Images', Image::count())
                ->description('Total uploaded images')
                ->icon('bx-images'),

            Stat::make('Images Uploaded Today', Image::whereDate('created_at', Carbon::today())->count())
                ->description('New images uploaded today')
                ->icon('bx-image-add')

        ];
    }
}
