"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GetFormatterForCurrency } from "@/lib/helpers";
import { Period, Timeframe } from "@/lib/type";
import { UserSettings } from "@prisma/client";
import React, { useMemo, useState } from "react";

function History({ userSettings }: { userSettings: UserSettings }) {
  const [timeframe, setTimeFrame] = useState<Timeframe>("month");
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="mx-auto px-8 sm:px-10 lg:px-12">
      <h2 className="mt-12 text-3xl font-bold">History</h2>
          <Card className="col-span-12 mt-2 w-full">
              <CardHeader className="gap-2">
                  <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
                      {/* <HistoryPeriodSelector period={period} setPeriod={setPeriod} /> */}
                  </CardTitle>
              </CardHeader>
      </Card>
    </div>
  );
}

export default History;
