<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use App\Models\User;
use Carbon\Carbon;

class TotalUsers extends BaseWidget
{

    protected static ?int $sort = 1; // Sort order on the dashboard

    protected function getStats(): array
    {
        return [

            Stat::make('Total Users', User::count())
                ->description('Total registered users')
                ->icon('heroicon-o-users'),

            Stat::make('Users Registered Today', User::whereDate('created_at', Carbon::today())->count())
                ->description('New users registered today')
                ->icon('heroicon-o-user-plus')
                
        ];
    }

}
