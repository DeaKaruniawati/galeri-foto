<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\Image;
use App\Models\User;
use App\Models\Album;
use Carbon\Carbon;

class CreatedToday extends BaseWidget
{
    protected static ?int $sort = 1; // Sort order on the dashboard

    protected function getStats(): array
    {
        return [

            Stat::make('Users Registered Today', User::whereDate('created_at', Carbon::today())->count())
                ->description('New users registered today')
                ->icon('heroicon-o-user-plus'),

            Stat::make('Images Uploaded Today', Image::whereDate('created_at', Carbon::today())->count())
                ->description('New images uploaded today')
                ->icon('bx-image-add'),

            Stat::make('Albums Created Today', Album::whereDate('created_at', Carbon::today())->count())
                ->description('New albums created today')
                ->icon('bx-folder-plus')
                
        ];
    }

}
