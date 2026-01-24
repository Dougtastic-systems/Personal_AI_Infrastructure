# Xactly Connect: P10-P13 Dynamic Modeling Update

**Date:** 2026-01-12
**Type:** SQL Development Session
**Status:** Complete

## Summary

Built production SQL for overrides statements dynamic modeling update covering periods P10-P13 (2025). The recalc table (`ovrd_dev.statements_modeling_dataset_history_recalc_p10_p11`) contained additive rows that were missing from the main history table, requiring a full UNION ALL approach.

## Period Mapping

| INCENTIVE_DATE | Period |
|----------------|--------|
| 2025-10-04 | P10 |
| 2025-11-01 | P11 |
| 2025-11-29 | P12 |
| 2025-12-27 | P13 |

All dates are Saturdays, 28 days apart.

## Key Discovery

**Initial assumption:** Recalc table contained replacement data for AT&T EDM + New Hire Bonus combo, requiring exclusion logic in main query.

**QA finding:** Recalc table was purely *additive* - rows that were missing from original history, not corrections to existing data.

**Final approach:** Simple UNION ALL with no exclusion logic needed.

## Final SQL

```sql
-- Full UNION ALL for P10 → P13. Recalc table was purely additive.
-- Production run to update dynamic modeling.

SELECT
      ot.sales_year
    , ot.overrides_period
    , ot.sales_year || '_' || ot.overrides_period as ovrd_yr_period
    , d.EmployeeID__c as PO_ICL_code
    , CapFirstLetters(POc.Name) as PO_Owner
    , d.Level as PO_level_actual
    , d.ProductionICLCode as Prod_ICL_code
    , CapFirstLetters(Pc.Name) as Prod_ICL_Owner
    , d.Gen as Prod_ICL_Gen
    , sum(d.Qty) as ovrd_eligible
    , sum(d.Amnt) as ovrd_cacl_result

FROM ovrd.statements_modeling_dataset_history d

LEFT JOIN sfdc.account POa
    ON d.EmployeeID__c = POa.ICL_Unified_Code__c

LEFT JOIN sfdc.contact POc
    ON POa.ICL_Owner__c = POc.Id

LEFT JOIN sfdc.account Pa
    ON d.ProductionICLCode = Pa.ICL_Unified_Code__c

LEFT JOIN sfdc.contact Pc
    ON Pa.ICL_Owner__c = Pc.Id

INNER JOIN ovrd.ovrd_timeperiods ot
    ON d.INCENTIVE_DATE = ot.sw_end_dt

WHERE d.INCENTIVE_DATE IN ('2025-10-04', '2025-11-01', '2025-11-29', '2025-12-27')

UNION ALL

SELECT
      r.sales_year
    , r.overrides_period
    , r.sales_year || '_' || r.overrides_period as ovrd_yr_period
    , r.EmployeeID__c as PO_ICL_code
    , CapFirstLetters(POc.Name) as PO_Owner
    , r.Level as PO_level_actual
    , r.ProductionICLCode as Prod_ICL_code
    , CapFirstLetters(Pc.Name) as Prod_ICL_Owner
    , r.Gen as Prod_ICL_Gen
    , sum(r.Qty) as ovrd_eligible
    , sum(r.Amnt) as ovrd_cacl_result

FROM ovrd_dev.statements_modeling_dataset_history_recalc_p10_p11 r

LEFT JOIN sfdc.account POa
    ON r.EmployeeID__c = POa.ICL_Unified_Code__c

LEFT JOIN sfdc.contact POc
    ON POa.ICL_Owner__c = POc.Id

LEFT JOIN sfdc.account Pa
    ON r.ProductionICLCode = Pa.ICL_Unified_Code__c

LEFT JOIN sfdc.contact Pc
    ON Pa.ICL_Owner__c = Pc.Id

ORDER BY 2, 4, 9, 8
```

## Output Columns (11)

1. sales_year
2. overrides_period
3. ovrd_yr_period
4. PO_ICL_code
5. PO_Owner
6. PO_level_actual
7. Prod_ICL_code
8. Prod_ICL_Owner
9. Prod_ICL_Gen
10. ovrd_eligible
11. ovrd_cacl_result

## Sort Order

1. overrides_period
2. PO_ICL_code
3. Prod_ICL_Gen
4. Prod_ICL_Owner

## Xactly Connect Notes

- No GROUP BY needed - auto-groups by non-aggregated columns
- `CapFirstLetters()` function for name formatting
- Recalc table already has `sales_year`, `overrides_period`, `sw_end_dt` denormalized (no timeperiods join needed)

## Tables Referenced

- `ovrd.statements_modeling_dataset_history` - main production data
- `ovrd_dev.statements_modeling_dataset_history_recalc_p10_p11` - additive recalc rows
- `ovrd.ovrd_timeperiods` - period/date mapping
- `sfdc.account` - ICL code to owner lookup
- `sfdc.contact` - owner names and IDs
