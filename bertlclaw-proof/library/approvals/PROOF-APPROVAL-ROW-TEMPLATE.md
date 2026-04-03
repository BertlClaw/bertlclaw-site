# BertlClaw Proof Approval Row Template

Use this when adding a new line to `proof-approval-register.csv`.

```text
item_id:
project_or_alias:
proof_item:
proof_type:
source_channel:
real_or_demo:
identification_level:
release_tier:
approval_status:
allowed_identity:
allowed_surfaces:
blocked_surfaces:
allowed_elements:
publication_limits:
claims_limit:
final_review_required:
approval_source:
approval_date:
review_expiry:
asset_location:
public_targets:
owner:
last_checked:
notes:
```

## Short fill hints

- `item_id`: stable ID like `BPA-0004`
- `proof_type`: testimonial / screenshot / mini_case / logo / quote / url / named_reference / text_excerpt / deliverable_gallery / demo_asset
- `release_tier`: A / B / C / D
- `approval_status`: not_requested / requested / partial / approved / conditional / rejected / expired
- `allowed_identity`: internal_only / anonymous_only / partial_identity / full_identity
- `allowed_surfaces`: separate multiple values with `|`
- `blocked_surfaces`: also use `|`
- `publication_limits`: concrete boundary in plain language
- `claims_limit`: what claim intensity is allowed
- `final_review_required`: yes / no

## BertlClaw default posture

If anything is unclear:
- keep `release_tier = A`
- keep `approval_status = not_requested` or `requested`
- keep `allowed_identity = internal_only`
- do not publish
