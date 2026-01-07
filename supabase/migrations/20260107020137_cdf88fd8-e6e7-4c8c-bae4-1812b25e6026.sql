-- Corrigir search_path na função update_updated_at_column
CREATE OR REPLACE FUNCTION core.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = core
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;